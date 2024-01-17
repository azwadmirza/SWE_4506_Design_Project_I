
from pathlib import Path
from decouple import config
from datetime import timedelta


CORS_ALLOW_ALL_ORIGINS = True


CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000"
]


CORS_ALLOW_CREDENTIALS = True


CORS_ALLOW_HEADERS = [
    'Content-Type',
    'Authorization',
    'Content-Disposition',
]


CSRF_TRUSTED_ORIGINS = ['http://localhost:5173',
    "http://localhost:3000"
                        ]

DB_HOST = config('_HOST')
DB_NAME = config('_DB_NAME')
DB_USER = config('_DB_USER')
DB_PASSWORD = config('_DB_PASSWORD')
SECRET_KEY = config('_SECRET_KEY')
AUTH = config('_AUTH')

BASE_DIR = Path(__file__).resolve().parent.parent

ALLOWED_HOSTS = ["dataanalyticaio-afhjk37pda-uw.a.run.app","127.0.0.1"]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://main--dataanalyticaiodp.netlify.app",
    "http://localhost:3000"
]

CORS_ALLOW_CREDENTIALS = True


CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CSRF_TRUSTED_ORIGINS = ["https://main--dataanalyticaiodp.netlify.app",'http://localhost:5173',
    "http://localhost:3000"]


# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'gateway',
    'normalization',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'user_profile',
    'file_controller',
    'decision_tree',
    'logistic_regression',
    'svm',
    'naive_bayes',
    'xgBoost',
    'knn',
    'optimized_model_search',
]

MIDDLEWARE = [
    
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'server.urls'

WSGI_APPLICATION = 'server.wsgi.application'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'CLIENT': {
            'host': DB_HOST,
            'username': DB_USER,
            'password': DB_PASSWORD,
            'name': DB_NAME,
            'authMechanism': AUTH,
        }
    }
}


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Set the token expiration time here
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_USER_MODEL = 'gateway.user'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.ScryptPasswordHasher",
]

CLOUDINARY = {
    'cloud_name': config('_CLOUD_NAME'),
    'api_key': config('_CLOUD_API_KEY'),
    'api_secret': config('_CLOUD_API_SECRET'),
}

CLOUDINARY_URL = f"cloudinary://{CLOUDINARY['api_key']}:{CLOUDINARY['api_secret']}@{CLOUDINARY['cloud_name']}"


EMAIL_BACKEND=config('_EMAIL_BACKEND')
EMAIL_HOST= config('_EMAIL_HOST')
EMAIL_PORT= config('_EMAIL_PORT')
EMAIL_USE_TLS= True
EMAIL_HOST_USER=config('_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD=config('_EMAIL_HOST_PASSWORD')


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'