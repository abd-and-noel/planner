from django.core.management.base import BaseCommand
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from django.utils.timezone import now

class Command(BaseCommand):
    help = 'Deletes all expired JWT refresh tokens from OutstandingToken table.'

    def handle(self, *args, **kwargs):
        expired_tokens = OutstandingToken.objects.filter(expires_at__lt=now())
        count, _ = expired_tokens.delete()

        self.stdout.write(self.style.SUCCESS(f'Deleted {count} expired tokens.'))