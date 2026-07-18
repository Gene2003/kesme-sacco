#!/usr/bin/env bash
# Render build step
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Create superuser from env vars if it doesn't already exist (idempotent).
# Set DJANGO_SUPERUSER_USERNAME / _EMAIL / _PASSWORD in the Render dashboard.
if [[ -n "$DJANGO_SUPERUSER_USERNAME" && -n "$DJANGO_SUPERUSER_PASSWORD" ]]; then
  python manage.py shell <<EOF
from django.contrib.auth import get_user_model
import os
User = get_user_model()
u = os.environ["DJANGO_SUPERUSER_USERNAME"]
if not User.objects.filter(username=u).exists():
    User.objects.create_superuser(
        username=u,
        email=os.environ.get("DJANGO_SUPERUSER_EMAIL", ""),
        password=os.environ["DJANGO_SUPERUSER_PASSWORD"],
    )
    print(f"Created superuser: {u}")
else:
    print(f"Superuser already exists: {u}")
EOF
fi
