from rest_framework_simplejwt.tokens import RefreshToken

def get_pair_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


def send_verification_email(user):
    pass
