class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  has_many :comment_likes
  has_many :users, through: :comment_likes
end
