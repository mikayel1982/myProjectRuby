class CommentLikeController < ApplicationController

 def create
   likecomment = CommentLike.new likecomment_params
    if likecomment.save
      redirect_to :back
    else
      render json: { errors: @like.errors.full_messages }, status: 406
    end 
  end

  def destroy
    CommentLike.find_by(likecomment_params).destroy
    redirect_to :back
  end

  private
    def likecomment_params
      params.require(:comment_like).permit(:comment_id, :user_id)
    end
end
