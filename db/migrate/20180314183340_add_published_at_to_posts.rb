class AddPublishedAtToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :publishedAt, :date
  end
end
