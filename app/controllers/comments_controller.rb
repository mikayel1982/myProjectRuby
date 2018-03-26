class CommentsController < ApplicationController


def create
  comment = Comment.new comment_params
  if comment.save
    redirect_to :back
  else
    flash[:errors] = post.errors.full_messages    
    redirect_to :back
  end

end

def destroy
  Comment.find(params[:id]).destroy
  redirect_to :back
end

private
  def comment_params
	params.require(:comment).permit(:content, :user_id, :post_id, :name)
  end

end
