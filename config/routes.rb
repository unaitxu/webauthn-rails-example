Rails.application.routes.draw do
  get '/register/new', to: 'registrations#new'

  post '/register/prepare', to: 'registrations#prepare'
  post '/register', to: 'registrations#create'
end
