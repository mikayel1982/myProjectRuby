class User < ActiveRecord::Base

  has_many :posts
  has_many :comments
  has_many :comment_likes
  has_many :likes
  has_many :posts_liked, :through => :likes, :source => :post

  has_secure_password

  validates :name, :alias, presence: true
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  
  before_save :email_lowercase

  def email_lowercase
    email.downcase!
  end

end
