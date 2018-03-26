Rails.application.routes.draw do
  
  # user
  root 'sessions#new'
  get 'main' => 'sessions#new'
  post 'sessionregs' => 'sessionregs#create'
  resources :sessions, only: [:new, :create, :destroy] 
  get 'users/:id' => 'users#show'

  # posts
  get 'bright_ideas' => 'bright_ideas#new'
  get 'info' => 'bright_ideas#showInfo'
  get 'bright_ideas/:id' => 'bright_ideas#show'
  post 'bright_ideas' => 'bright_ideas#create'
  delete 'bright_ideas/:id' => 'bright_ideas#destroy'

  #llkes
  post 'likes/' => 'likes#create'
  delete 'likes/' => 'likes#destroy'

  #comments
  post 'comments/' => 'comments#create'
  delete 'comments/:id' => 'comments#destroy'

  # comment llkes
  post 'comment_like/' => 'comment_like#create'
  delete 'comment_like/' => 'comment_like#destroy'
end
