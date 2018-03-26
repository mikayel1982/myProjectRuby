class AddNewsTitleToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :newsTitle, :string
  end
end
