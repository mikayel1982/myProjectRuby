class AddFullnameToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :fullname, :string
  end
end
