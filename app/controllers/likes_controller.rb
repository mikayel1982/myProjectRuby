class LikesController < ApplicationController

	def create
    @like = Like.new like_params
    if @like.save
      redirect_to :back
    else
      render json: { errors: @like.errors.full_messages }, status: 406
    end  
  end

  def destroy
    Like.find_by(like_params).destroy
    redirect_to :back
  end

  private
    def like_params
      params.require(:like).permit(:user_id, :post_id)
    end
end
