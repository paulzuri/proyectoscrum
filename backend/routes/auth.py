from flask import Blueprint, redirect, url_for, session
from extensions import oauth
import os
from urllib.parse import urlencode, quote_plus

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("auth.callback", _external=True)
    )

@auth_bp.route('/callback', methods=['GET', 'POST'])
def callback():
    try:
        # Obtener el token de acceso desde Auth0
        token = oauth.auth0.authorize_access_token()
        user_info = oauth.auth0.parse_id_token(token)

        # Guardar la información del usuario en la sesión
        session["user"] = user_info
        return redirect(url_for("home"))
    except Exception as e:
        print(f"Error en callback: {e}")
        return "Error durante la autenticación", 400

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(
        "https://" + os.getenv("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": os.getenv("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )
