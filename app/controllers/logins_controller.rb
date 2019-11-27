class LoginsController < ApplicationController
  def prepare
    u = User.find_by!(username: login_params[:username])

    options = WebAuthn::Credential.options_for_get(allow: [u.user_id])

    session[:login_challenge] = options.challenge
    session[:login_username] = login_params[:username]

    render json: options
  end

  def create
    u = User.find_by(username: session[:login_username])

    c = WebAuthn::Credential.from_get(params[:login])
    c.verify(
      session[:login_challenge],
      public_key: u.public_key,
      sign_count: u.sign_count,
    )

    u.update(sign_count: c.sign_count)
  end

  def new
  end

  protected

  def login_params
    params.require(:login).permit(:username)
  end
end
