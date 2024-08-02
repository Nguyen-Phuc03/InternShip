if [ ! -f .env.dev ]; then
  echo ".env.dev không tồn tại!"
  exit 1
fi

# Đọc các biến từ .env.dev và ghi vào .env
echo "Tạo file .env từ .env.dev..."

# Xóa file .env hiện có
rm -f .env

# Chỉ copy các biến cần thiết
while IFS= read -r line; do
  case "$line" in
    NODE_ENV=*|MONGO_URI=*|APP_NAME=*|PORT=*)
      echo "$line" >> .env
      ;;
  esac
done < .env.dev

echo "Hoàn thành việc tạo file .env"