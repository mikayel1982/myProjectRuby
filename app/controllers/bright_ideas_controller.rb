class BrightIdeasController < ApplicationController

  def new
    render :new
  end 

  def showInfo 
    render_partials
  end

  def create
    post = Post.new post_params
    if post.save
      render_partials
    else
      flash[:errors] = post.errors.full_messages    
      redirect_to :back
    end
  end

  def show
    @post = Post.find(params[:id]) 
    @users = User.all
    @posts = Post.all
    @sharedPost = Post.where(newsTitle: @post.newsTitle)
    @likedUsers = Like.where(post_id: @sharedPost.ids).group(:user_id)
    @likedUsersCount = @likedUsers.all.to_a.count
  end

  def destroy
    Post.find(params[:id]).destroy
    redirect_to :back
  end

private
  def post_params
    params.require(:post).permit(:content, :user_id, :newsTitle, :fullname, :image, :description, :url)
  end

  def render_partials
    render :partial => "partials/news", :locals => {:posts => Post.all }
  end
end
