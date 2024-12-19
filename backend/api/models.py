
from django.db import models
from django.urls import reverse
import qrcode
from io import BytesIO
from django.core.files import File
from django.db.models.signals import post_save
from django.dispatch import receiver

class Cultivar(models.Model):
    especie = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    epoca_siembra_sugerida = models.CharField(max_length=100)
    densidad_siembra = models.CharField(max_length=100)
    ciclo_floracion = models.CharField(max_length=100)
    habito = models.CharField(max_length=100)
    usos_sugeridos = models.TextField()
    caracteristicas_productivas = models.TextField()
    evaluacion_nacional_inase_inia = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.especie} - {self.nombre}"


class Lote(models.Model):
    cultivar = models.ForeignKey(Cultivar, on_delete=models.CASCADE, related_name='lotes')
    numero_lote = models.CharField(max_length=50, unique=True)
    departamento_origen = models.CharField(max_length=100)
    pureza = models.DecimalField(max_digits=5, decimal_places=2)  # Porcentaje
    germinacion = models.DecimalField(max_digits=5, decimal_places=2)  # Porcentaje
    peso_mil_semillas = models.DecimalField(max_digits=10, decimal_places=2)  # Peso en gramos
    enlace_analisis = models.URLField(blank=True, null=True)  # Enlace a análisis de laboratorio
    codigo_qr = models.ImageField(upload_to='qrcodes/', blank=True, null=True)

    def __str__(self):
        return self.numero_lote

    def get_absolute_url(self):
        return reverse('lote-detail', args=[str(self.id)])


@receiver(post_save, sender=Lote)
def generate_qr_code(sender, instance, created, **kwargs):
    if created and not instance.codigo_qr:
        # Construir la URL completa del lote
        qr_url = instance.get_absolute_url()
        full_url = f"http://localhost:8000{qr_url}"  # Reemplaza con el dominio real en producción

        # Generar el código QR
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(full_url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        filename = f"lote_{instance.numero_lote}.png"
        instance.codigo_qr.save(filename, File(buffer), save=False)
        instance.save()