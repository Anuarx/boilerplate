# api/serializers.py

from rest_framework import serializers
from .models import Cultivar, Lote
from django.contrib.auth.models import User

class CultivarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivar
        fields = '__all__'


class LoteSerializer(serializers.ModelSerializer):
    cultivar = CultivarSerializer(read_only=True)
    cultivar_id = serializers.PrimaryKeyRelatedField(
        queryset=Cultivar.objects.all(),
        source='cultivar',
        write_only=True
    )
    codigo_qr_url = serializers.SerializerMethodField()

    class Meta:
        model = Lote
        fields = [
            'id',
            'cultivar',
            'cultivar_id',
            'numero_lote',
            'departamento_origen',
            'pureza',
            'germinacion',
            'peso_mil_semillas',
            'enlace_analisis',
            'codigo_qr_url',
        ]

    def get_codigo_qr_url(self, obj):
        request = self.context.get('request')
        if obj.codigo_qr and hasattr(obj.codigo_qr, 'url'):
            return request.build_absolute_uri(obj.codigo_qr.url)
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
