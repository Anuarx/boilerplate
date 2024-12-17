# api/views.py

import re
from rest_framework import viewsets, status
from .models import Cultivar, Lote
from .serializers import CultivarSerializer, LoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from django.db import transaction

class CultivarViewSet(viewsets.ModelViewSet):
    queryset = Cultivar.objects.all()
    serializer_class = CultivarSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class UploadExcelView(APIView):
    """
    Vista para cargar y procesar archivos Excel que contienen datos de cultivares y lotes.
    Requiere autenticación mediante Token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        file = request.FILES.get('file')
        if not file:
            return Response(
                {"error": "No se ha proporcionado ningún archivo."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Leer el archivo Excel usando pandas
            df = pd.read_excel(file, engine='openpyxl')

            # Definir las columnas esperadas
            expected_columns = [
                'Especie', 'Cultivar', 'Época de siembra sugerida', 'Densidad de siembra',
                'Ciclo de floración', 'Hábito', 'Usos sugeridos',
                'Características productivas', 'Evaluación Nacional de Cultivares INASE-INIA',
                'Lote', 'Departamento de origen', 'Pureza (%)', 'Germinación (%)',
                'Peso de mil semillas', 'Enlace a análisis de laboratorio'
            ]

            # Verificar la presencia de todas las columnas esperadas
            missing_columns = [col for col in expected_columns if col not in df.columns]
            if missing_columns:
                return Response(
                    {"error": f"Faltan las siguientes columnas en el archivo Excel: {', '.join(missing_columns)}."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Rellenar valores vacíos en 'Especie' y 'Cultivar' usando forward fill
            df[['Especie', 'Cultivar']] = df[['Especie', 'Cultivar']].fillna(method='ffill')

            # Verificar que no queden valores vacíos en 'Especie' y 'Cultivar'
            if df[['Especie', 'Cultivar']].isnull().any().any():
                return Response(
                    {"error": "Existen filas con 'Especie' o 'Cultivar' vacíos después del relleno hacia adelante."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Procesar cada fila del DataFrame dentro de una transacción atómica
            with transaction.atomic():
                for index, row in df.iterrows():
                    fila_num = index + 2  # Considerando la cabecera en la fila 1

                    # Validar campos requeridos
                    required_fields = [
                        'Especie', 'Cultivar', 'Lote', 
                        'Departamento de origen', 'Pureza (%)', 
                        'Germinación (%)', 'Peso de mil semillas'
                    ]
                    for field in required_fields:
                        if pd.isnull(row[field]):
                            raise ValueError(f"El campo '{field}' está vacío en la fila {fila_num}.")

                    # Manejar comas decimales reemplazándolas por puntos
                    pureza_str = str(row['Pureza (%)']).replace(',', '.')
                    germinacion_str = str(row['Germinación (%)']).replace(',', '.')
                    peso_mil_semillas_str = str(row['Peso de mil semillas']).replace(',', '.')

                    # Convertir los campos numéricos a float
                    try:
                        pureza = float(pureza_str)
                        germinacion = float(germinacion_str)
                        peso_mil_semillas = float(peso_mil_semillas_str)
                    except ValueError:
                        raise ValueError(f"Formato numérico inválido en la fila {fila_num}.")

                    # Validar el campo de enlace a análisis de laboratorio si está presente
                    enlace_analisis = row.get('Enlace a análisis de laboratorio', None)
                    if pd.notnull(enlace_analisis) and enlace_analisis.strip().lower() != 'link':
                        if not self.is_valid_url(enlace_analisis):
                            raise ValueError(f"URL inválida en 'Enlace a análisis de laboratorio' en la fila {fila_num}.")
                    else:
                        enlace_analisis = None  # Tratar como None si está vacío o es 'link'

                    # Crear o actualizar el Cultivar
                    cultivar, created = Cultivar.objects.get_or_create(
                        especie=row['Especie'],
                        nombre=row['Cultivar'],
                        defaults={
                            'epoca_siembra_sugerida': row['Época de siembra sugerida'],
                            'densidad_siembra': row['Densidad de siembra'],
                            'ciclo_floracion': row['Ciclo de floración'],
                            'habito': row['Hábito'],
                            'usos_sugeridos': row['Usos sugeridos'],
                            'caracteristicas_productivas': row['Características productivas'],
                            'evaluacion_nacional_inase_inia': row['Evaluación Nacional de Cultivares INASE-INIA'],
                        }
                    )
                    if not created:
                        # Actualizar campos si el Cultivar ya existe
                        cultivar.epoca_siembra_sugerida = row['Época de siembra sugerida']
                        cultivar.densidad_siembra = row['Densidad de siembra']
                        cultivar.ciclo_floracion = row['Ciclo de floración']
                        cultivar.habito = row['Hábito']
                        cultivar.usos_sugeridos = row['Usos sugeridos']
                        cultivar.caracteristicas_productivas = row['Características productivas']
                        cultivar.evaluacion_nacional_inase_inia = row['Evaluación Nacional de Cultivares INASE-INIA']
                        cultivar.save()

                    # Crear o actualizar el Lote
                    lote, lote_created = Lote.objects.get_or_create(
                        numero_lote=row['Lote'],
                        defaults={
                            'cultivar': cultivar,
                            'departamento_origen': row['Departamento de origen'],
                            'pureza': pureza,
                            'germinacion': germinacion,
                            'peso_mil_semillas': peso_mil_semillas,
                            'enlace_analisis': enlace_analisis,
                        }
                    )
                    if not lote_created:
                        # Actualizar campos si el Lote ya existe
                        lote.cultivar = cultivar
                        lote.departamento_origen = row['Departamento de origen']
                        lote.pureza = pureza
                        lote.germinacion = germinacion
                        lote.peso_mil_semillas = peso_mil_semillas
                        lote.enlace_analisis = enlace_analisis
                        lote.save()

            return Response(
                {"message": "Archivo procesado exitosamente."},
                status=status.HTTP_201_CREATED
            )
        
        except ValueError as ve:
            return Response(
                {"error": str(ve)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Error al procesar el archivo: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def is_valid_url(self, url):
        """
        Valida si una cadena es una URL válida utilizando una expresión regular.
        """
        regex = re.compile(
            r'^(?:http|ftp)s?://'  # http:// o https://
            r'(?:\S+(?::\S*)?@)?'  # usuario:contraseña@
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+'  # dominio...
            r'(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # ...con extensión...
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...o dirección IP
            r'(?::\d+)?'  # puerto
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        return re.match(regex, url) is not None