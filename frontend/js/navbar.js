// navbar.js
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;

            // Kiểm tra token để hiển thị các nút tương ứng
            const token = localStorage.getItem("token");
            if (token) {
                document.getElementById("logoutButton").style.display = "inline-block";
                document.getElementById("registerButton").style.display = "none";
                document.getElementById("loginButton").style.display = "none";
                document.getElementById("orderHistoryButton").style.display = "inline-block"; // Hiển thị nút lịch sử đơn hàng
            }

            // Đếm số lượng sản phẩm trong giỏ từ localStorage (ví dụ)
            const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            document.getElementById("cartCount").innerText = cartItems.length;

            // Thêm sự kiện Đăng xuất
            document.getElementById("logoutButton").addEventListener("click", function () {
                localStorage.removeItem("token");
                window.location.reload();
            });

            // Lấy số lượng sản phẩm trong giỏ hàng từ api
            const getCartQuantity = async () => {
                const response = await fetch('http://localhost:3030/api/cart', {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    }
                });
                const data = await response.json();

                const cartItems = data.data.cartItems || [];
                const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

                if (data.success) {
                    document.getElementById("cartCount").innerText = totalItems;
                } else {
                    console.error(data.message);
                }
            }

            // Gọi hàm getCartQuantity khi trang được tải
            if (token) getCartQuantity();

        })
        .catch(error => console.error('Error loading navbar:', error));
}

function updateCartCount() {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Lấy số lượng sản phẩm trong giỏ hàng từ API
    fetch('http://localhost:3030/api/cart', {
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            const cartItems = data.data.cartItems || [];
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

            if (data.success) {
                document.getElementById("cartCount").innerText = totalItems;
            } else {
                console.error(data.message);
            }
        })
        .catch(error => console.error('Error updating cart count:', error));
}


// Gọi hàm loadNavbar khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    updateCartCount(); // Cập nhật số lượng giỏ hàng khi tải navbar
});

