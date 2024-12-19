# trazabilidad_semillas/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions

# Para servir archivos media en desarrollo
from django.conf import settings
from django.conf.urls.static import static

# Importar vistas para documentación de la API
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="API de Trazabilidad de Semillas Forrajeras",
      default_version='v1',
      description="API para gestionar la trazabilidad de semillas forrajeras en Calvase",
      terms_of_service="https://www.tusitio.com/terms/",
      contact=openapi.Contact(email="contacto@calvase.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Rutas para la documentación de la API
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
