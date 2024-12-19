# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CultivarViewSet, LoteViewSet, UploadExcelView
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'cultivares', CultivarViewSet, basename='cultivar')
router.register(r'lotes', LoteViewSet, basename='lote')

urlpatterns = [
    path('', include(router.urls)),
    
    # Ruta para autenticación Token
    path('token-auth/', obtain_auth_token, name='api_token_auth'),
    
    # Ruta para subir archivos Excel
    path('upload-excel/', UploadExcelView.as_view(), name='upload_excel'),
]
