class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.binary :user_id
      t.binary :public_key
      t.integer :sign_count

      t.timestamps
    end
  end
end
