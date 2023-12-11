window.onload=function()
{
    addEventChangeTab();
    //if (window.localStorage.getItem('admin')) {
        productList1();
        productList2();
        showProductList1();
        showProductList2();
        openTab('Quản Lý Sản Phẩm');
    // } else {
    //     document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Truy cập bị từ chối.. </h1>`;
    // }
}

function logOutAdmin() {
    window.localStorage.removeItem('admin');
}

// ======================= Các Tab =========================
function addEventChangeTab() {
    var list_a = document.querySelectorAll('.nav-link');
    list_a.forEach(function(a) {
        a.addEventListener('click', function() {
            turnOff_Active();
            this.classList.add('active');
            var tab = this.textContent.trim();
            openTab(tab);
        });
    });
}

function turnOff_Active() {
    var list_a = document.querySelectorAll('.nav-link');
    list_a.forEach(function(a) {
        a.classList.remove('active');
    });
}

function openTab(nameTab) {
    // ẩn hết
    var main = document.getElementsByClassName('container')[0].children;
    for(var e of main) {
        e.style.display = 'none';
    }

    // mở tab
    switch(nameTab) {
        case 'Quản Lý Sản Phẩm': document.getElementsByClassName('SanPham')[0].style.display = 'block'; break;
        case 'Quản Lý Đơn Hàng': document.getElementsByClassName('DonHang')[0].style.display = 'block'; break;
        case 'Thống Kê Kinh Doanh': document.getElementsByClassName('KinhDoanh')[0].style.display = 'block'; break;
        case 'Quản Lý Người Dùng': document.getElementsByClassName('NguoiDung')[0].style.display = 'block'; break;
    }
}
// ================================Quản Lý Sản Phẩm===============================
var productArray = [];
var editIndex = -1; // biến để theo dõi sản phẩm nào đang được chỉnh sửa

function showProductList1() {
    if(localStorage.getItem('product') === null) {
        productList1();
    }
    productArray = JSON.parse(localStorage.getItem('product'));
    var tr = '';
    for(var i = 0; i < productArray.length; i++) {
        tr += `<tr>
                <td style="width: 8%">` + (i+1) + `</td>
                <td style="width: 12%">` + productArray[i].idsp + `</td>
                <td style="width: 30%">` + productArray[i].tensp + `</td>
                <td style="width: 12%">` + productArray[i].giasp + ` Vnd</td>
                <td style="width: 16%">` + productArray[i].thoigian + `</td>
                <td style="width: 14%"><img src="` + productArray[i].hinhsp + `" width="180px" ></td>
                <td>
                    <div class="tooltip">
                        <button class="edit" onClick="editProduct1(`+i+`)"><i class="fa fa-wrench"></i></button>
                        <span class="tooltiptext">Sửa</span>
                    </div>
                    <div class="tooltip">
                        <button class="delete" onClick="deleteProduct1(`+i+`)"><i class="fa fa-trash"></i></button>
                        <span class="tooltiptext">Xóa</span>
                    </div>
                </td>
            </tr>`;
    }
    document.getElementsByClassName('SanPham')[0].getElementsByClassName('product')[0].innerHTML = tr;
}

function createProduct1() {
var d = new Date();
    var id = document.getElementById("idsp").value;
    var ten = document.getElementById("tensp").value;
    var gia = document.getElementById("giasp").value;
    var noiDung = document.getElementById("noidungsp").value;
    var hinhAnh = document.getElementById("hinhsp").files[0];

    if (!id || !ten || !gia || !hinhAnh) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }
    var reader = new FileReader();
    reader.onloadend = function() {
        var product = {
            idsp: id,
            tensp: ten,
            giasp: gia,
            noidungsp: noiDung,
            thoigian: d.toLocaleString(),
            hinhsp: reader.result
        };

        if (editIndex === -1) {
            // thêm sản phẩm mới
            productArray.push(product);
        } else {
            // cập nhật sản phẩm hiện có
            productArray[editIndex] = product;
            editIndex = -1; // reset biến editIndex
        }

        localStorage.setItem('product', JSON.stringify(productArray));
        showProductList1();
        alert('Sửa ' + ten + ' thành công');
        document.getElementById("wrapper").style.transform = 'scale(0)'; // ẩn form chỉnh sửa
        document.getElementById("overlay").style.display = "none";

    }
    reader.readAsDataURL(hinhAnh);
}

function deleteProduct1(index){
    if(confirm('Bạn có muốn xóa sản phẩm này?')){
        productArray.splice(index, 1);
    }
    localStorage.setItem('product',JSON.stringify(productArray));
    showProductList1();
}
let previewSrc;
function editProduct1(index) {
    document.getElementById("wrapper").style.transform = 'scale(1)';
    document.getElementById("overlay").style.display = "block";
    var product = productArray[index];
    document.getElementById("idsp").value = product.idsp;
    document.getElementById("tensp").value = product.tensp;
    document.getElementById("giasp").value = product.giasp;
    document.getElementById("noidungsp").value = product.noidungsp;
    document.getElementById("hinhsp").src = product.hinhsp;
    editIndex = index; // cập nhật biến editIndex
}

function capNhatAnhSanPham(files) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        previewSrc = reader.result;
        document.getElementById('anhDaiDienSanPham').src = previewSrc;
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
}

function openForm(){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("wrapper").style.transform = 'scale(1)';
}
function closeForm() {
    document.getElementById("wrapper").style.transform = 'scale(0)'; // ẩn form chỉnh sửa
    document.getElementById("overlay").style.display = "none";
    editIndex = -1; // reset biến editIndex
}

function productList1(){
	if(localStorage.getItem('product')===null){
var d = new Date();
    var productArray = [
        {idsp:10001, tensp:'Bánh Trung Thu Tiramisu Phô Mai', giasp:"135.000",noidungsp:`-Bánh trung thu Mordan Bakery\n-Loại bánh: Bánh nướng - Bánh trung thu nhân ngọt\n-Hương vị: Tiramisu\n-Trọng lượng: 180gr\n-Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10001.jpg'},
        {idsp:10002, tensp:'Bánh Trung Thu Hạt Sen - Hạt Chia - Mắc Ca', giasp:"145.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng`  , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10002.jpg'},
        {idsp:10003, tensp:'Bánh Trung Thu Trà Xanh - Hạnh Nhân ( 1 Trứng )', giasp:"155.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10003.jpg'},
        {idsp:10004, tensp:'Bánh Trung Thu Sò Điệp Sốt HongKong ( 1 Trứng )', giasp:"155.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10004.jpg'},
        {idsp:10005, tensp:'Bánh Trung Thu Yến Sào Hạt Sen - Táo Đỏ - Kỷ Tử', giasp:"155.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng`  , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10005.jpg'},
        {idsp:10006, tensp:'Bánh Trung Thu Khoai Môn - Hạt Óc Chó ( 1 Trứng )', giasp:"155.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10006.jpg'},
        {idsp:10007, tensp:'Bánh Trung Thu Tôm Hùm Sốt HongKong ( 1 Trứng )', giasp:"165.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10007.jpg'},
        {idsp:10008, tensp:'Bánh Trung Thu Gà Quay - Vi Cá ( 1 Trứng )', giasp:"165.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng`  , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10008.jpg'},
        {idsp:10009, tensp:'Bánh Trung Thu Yến Sào Trà Xanh - Mắc Ca', giasp:"165.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10009.jpg'},
        {idsp:10010, tensp:'Bánh Trung Thu Nhất Yến Thượng Hạng', giasp:"165.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10010.jpg'},
        {idsp:10011, tensp:'Bánh Trung Thu Bào Ngư Sốt Rượu Vang ( 1 Trứng )', giasp:"185.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10011.jpg'},
        {idsp:10012, tensp:'Bánh Trung Thu Yến Sào Đông Trùng Hạ Thảo ( 1 Trứng )', giasp:"185.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10012.jpg'},
        {idsp:10013, tensp:'Combo Hải Vân 01', giasp:"260.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10013.jpg'},
        {idsp:10014, tensp:'Combo Hải Vân 02', giasp:"280.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10014.jpg'},
        {idsp:10015, tensp:'Combo Hải Vân 03', giasp:"310.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10015.jpg'},
        {idsp:10016, tensp:'Combo Thủy Nhạc 01', giasp:"570.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10016.jpg'},
        {idsp:10017, tensp:'Combo Thủy Nhạc 02', giasp:"590.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10017.jpg'},
        {idsp:10018, tensp:'Combo Thủy Nhạc 03', giasp:"590.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10018.jpg'},
        {idsp:10019, tensp:'Combo Hưng Phúc', giasp:"610.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10019.jpg'},
        {idsp:10020, tensp:'Combo Phú Quý 01', giasp:"630.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10020.jpg'},
        {idsp:10021, tensp:'Combo Phú Quý 02', giasp:"650.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10021.jpg'},
        {idsp:10022, tensp:'Combo Phú Quý 03', giasp:"680.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10022.jpg'},
        {idsp:10023, tensp:'Combo Phú Quý 04', giasp:"680.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10023.jpg'},
        {idsp:10024, tensp:'Combo Phú Quý 05', giasp:"680.000",noidungsp:` Bánh trung thu Mordan Bakery\n Loại bánh: Bánh nướng\n Bánh trung thu nhân ngọt\n Hương vị: Tiramisu\n Trọng lượng: 180gr\n Hạn sử dụng: 2 tháng` , thoigian: d.toLocaleString(), hinhsp:'hinhanh/10024.jpg'},
    ];
    localStorage.setItem('product',JSON.stringify(productArray));
    }
}

function sortProductsTable1(loai) {
    var list = document.getElementsByClassName('SanPham')[0].getElementsByClassName('product')[0];
    var vl = list.getElementsByTagName('tr');

    quickSort(vl, 0, vl.length-1, loai, getValueOfTypeInTable_SanPham1); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham1(vl, loai) {
    var td = vl.getElementsByTagName('td');
    switch(loai) {
        case 'stt' : return Number(td[0].innerHTML);
        case 'idsp' : return td[1].innerHTML.toLowerCase();
        case 'tensp' : return td[2].innerHTML.toLowerCase();
        case 'giasp' : return Number(td[3].innerHTML);
        case 'thoigian' : return (td[4].innerHTML);
    }
    return false;
}

//Tìm kiếm
function filterTable1() {
    const sanPhamElement = document.querySelector('.SanPham');
    const kieuTim = sanPhamElement.querySelector('[name="kieuTimSanPham"]').value;
    const vitriKieuTim = {'id':1, 'ten':2};

    const input = sanPhamElement.querySelector(".myInput");
    const filter = input.value.toUpperCase();
    const table = sanPhamElement.querySelector('.product');
    const tr = table.querySelectorAll("tr");
    
    tr.forEach(row => {
        const td = row.querySelectorAll("td")[vitriKieuTim[kieuTim]];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            row.style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
        }
    });
}


// ================================Quản Lý Đơn Hàng============================
var listDH = [];
function showProductList2() {
    TONGTIEN = 0;
    // listDH = JSON.parse(localStorage.getItem('cart'));
    // console.log(listDH);
    var tr = '';
    for(var i = 0; i < listDH.length; i++) {
        tr += `<tr>
                <td style="width: 8%">` + (i+1) + `</td>
                <td style="width: 12%">` + listDH[i].madon + `</td>
                <td style="width: 12%">` + listDH[i].khach + `</td>
                <td style="width: 20%">` + listDH[i].sanpham + `</td>
                <td style="width: 12%">` + listDH[i].tongtien + `</td>
                <td style="width: 15%">` + listDH[i].ngaygio + `</td>
                <td style="width: 12%">` + listDH[i].trangthai + `</td>
                <td>
                    <div class="tooltip">
                        <button class="edit" onClick="editProduct2(`+i+`)"><i class="fa fa-check"></i></button>
                        <span class="tooltiptext">Duyệt</span>
                    </div>
                    <div class="tooltip">
                        <button class="delete" onClick="deleteProduct2(`+i+`)"><i class="fa fa-times"></i></button>
                        <span class="tooltiptext">Hủy</span>
                    </div>
                </td>
            </tr>`;
        TONGTIEN += listDH.tongtien;
    }
    document.getElementsByClassName('DonHang')[0].getElementsByClassName('product')[0].innerHTML = tr;
}

function productList2(){
	// if(localStorage.getItem('donhang')===null){
var d = new Date();
    var listDH = [
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
        {madon:d, khach:'Bánh Trung Thu Tiramisu Phô Mai', sanpham: "tyu", tongtien:"135.000", ngaygio: d.toLocaleString()},
    ];
    localStorage.setItem('donhang',JSON.stringify(listDH));
    }
// }

//Tìm kiếm
function filterTable2() {
    const sanPhamElement = document.querySelector('.DonHang');
    const kieuTim = sanPhamElement.querySelector('[name="kieuTimSanPham"]').value;
    const vitriKieuTim = {'madon':1, 'khach':2, 'sanpham':3, 'tongtien':4};

    const input = sanPhamElement.querySelector(".myInput");
    const filter = input.value.toUpperCase();
    const table = sanPhamElement.querySelector('.product');
    const tr = table.querySelectorAll("tr");
    
    tr.forEach(row => {
        const td = row.querySelectorAll("td")[vitriKieuTim[kieuTim]];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            row.style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
        }
    });
}

function locDonHangTheoKhoangNgay() {
    var from = document.getElementById('fromDate').valueAsDate;
    var to = document.getElementById('toDate').valueAsDate;

    var listTr_table = document.getElementsByClassName('DonHang')[0].getElementsByClassName('product')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[5].innerHTML;
        var d = new Date(td);

        if (d >= from && d <= to) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }
}

function sortProductsTable2(loai) {
    var list = document.getElementsByClassName('DonHang')[0].getElementsByClassName('product')[0];
    var vl = list.getElementsByTagName('tr');

    quickSort(vl, 0, vl.length-1, loai, getValueOfTypeInTable_SanPham2); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham2(vl, loai) {
    var td = vl.getElementsByTagName('td');
    switch(loai) {
        case 'stt' : return Number(td[0].innerHTML);
        case 'madon' : return td[1].innerHTML.toLowerCase();
        case 'khach' : return td[2].innerHTML.toLowerCase();
        case 'sanpham' : return td[3].innerHTML.toLowerCase();
        case 'tongtien' : return td[4].innerHTML.toLowerCase();
        case 'ngaygio' : return td[5].innerHTML.toLowerCase();
        case 'trangthai' : return td[6].innerHTML.toLowerCase();
    }
    return false;
}

//================================Quản Lý Người Dùng======================================

//Tìm kiếm
function filterTable4() {
    const sanPhamElement = document.querySelector('.NguoiDung');
    const kieuTim = sanPhamElement.querySelector('[name="kieuTimSanPham"]').value;
    const vitriKieuTim = {'ten':1, 'email':2, 'tk':3};

    const input = sanPhamElement.querySelector(".myInput");
    const filter = input.value.toUpperCase();
    const table = sanPhamElement.querySelector('.product');
    const tr = table.querySelectorAll("tr");
    
    tr.forEach(row => {
        const td = row.querySelectorAll("td")[vitriKieuTim[kieuTim]];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            row.style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
        }
    });
}

function sortProductsTable4(loai) {
    var list = document.getElementsByClassName('NguoiDung')[0].getElementsByClassName('product')[0];
    var vl = list.getElementsByTagName('tr');

    quickSort(vl, 0, vl.length-1, loai, getValueOfTypeInTable_SanPham4); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham4(vl, loai) {
    var td = vl.getElementsByTagName('td');
    switch(loai) {
        case 'stt' : return Number(td[0].innerHTML);
        case 'hoten' : return td[1].innerHTML.toLowerCase();
        case 'email' : return td[2].innerHTML.toLowerCase();
        case 'tk' : return td[3].innerHTML.toLowerCase();
        case 'mk' : return td[4].innerHTML.toLowerCase();
    }
    return false;
}
// ================== Sort ====================
// https://github.com/HoangTran0410/First_html_css_js/blob/master/sketch.js
var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
function quickSort(arr, left, right, loai, func) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai, func);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai, func);
        quickSort(arr, partitionIndex + 1, right, loai, func);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai, func) {
    var pivotValue =  func(arr[pivot], loai),
        partitionIndex = left;
    
    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue
        || !decrease && func(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}



