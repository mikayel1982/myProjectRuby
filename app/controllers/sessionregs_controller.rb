class SessionregsController < ApplicationController

  skip_before_action :require_login, only: [:new, :create]

  def create
  @user = User.new user_params
  	if @user.save
  	   flash[:message] = 'You can now log in' 
  	   redirect_to :back
  	else
       flash[:errors] = @user.errors.full_messages    
       redirect_to :back
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :alias, :email, :password, :password_confirmation)
    end
end
