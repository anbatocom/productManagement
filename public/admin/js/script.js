// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");
if (boxFilter) {
  let url = new URL(location.href); //nhân bản url, location.href là địa chỉ trang hiện tại
  // Bắt sự kiện onChange
  boxFilter.addEventListener("change", () => {
    const value = boxFilter.value;

    if (value) {
      url.searchParams.set("status", value); //searchParasm là các giá trị sau dấu ? phía sau location.href
    } else {
      url.searchParams.delete("status");
    }

    location.href = url.href //cập nhật đường link cũ thành đường link mới vừa nhân bản
  })

  //Hiển thị lựa chọn mặc định
  const statusCurrent = url.searchParams.get("status")
  if (statusCurrent) {
    boxFilter.value = statusCurrent
  }

}
// End Bộ lọc

// Tìm kiếm
const formSearch = document.querySelector('[form-search]')
if (formSearch) {
  let url = new URL(location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = formSearch.keyword.value;

    if (value) {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }
    location.href = url.href;
  });
  //Hiển thị từ khóa mặc định
  const valueCurrent = url.searchParams.get("keyword")
  if (valueCurrent) {
    formSearch.keyword.value = valueCurrent;
  }
}
// End Tìm kiếm

//Phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) { // check length > 0 vì trong trường hợp độ dài của array = 0 (do sử dụng querySelectorAll(trả ra một mảng)) thì điều kiện của if vẫn đúng và code trong if vẫn chạy 

  let url = new URL(location.href);

  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {

      const page = button.getAttribute("button-pagination");

      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      location.href = url.href;
    })
  })
  const pageCurrent = url.searchParams.get("page") || 1;//trường hợp không gửi lên thì mặc định là page 1
  const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`);
  if (buttonCurrent) {
    buttonCurrent.parentNode.classList.add("active");
  }
}
//End Phân trang

// Đổi trạng thái
const changeStatusButton_list = document.querySelectorAll("[statusChange-button]")
if (changeStatusButton_list.length > 0) {
  changeStatusButton_list.forEach(button => {
    button.addEventListener("click", () => {
      const itemID = button.getAttribute("itemID");
      const statusChange = button.getAttribute("statuschange-button")
      const data_path = button.getAttribute("data-path");

      const data = {
        id: itemID,
        status: statusChange
      };
      console.log(data);

      fetch(data_path, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data) // chuyển data thành dạng json để giao tiếp với backend
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == "success") {
            location.reload();
          }
        })
    })
  })
}
// End Đổi trạng thái

// Đổi nhiều trạng thái cùng lúc
const multiChange_form = document.querySelector("[multiChange-form]")
if (multiChange_form) {
  multiChange_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const path = multiChange_form.getAttribute("dataPath");

    const status = multiChange_form.status.value;
    if (status == "delete") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này");
      if (!isConfirm) {
        return 0;
      }
    }
    //status lấy từ att name của thẻ select, value lấy từ thẻ option
    const ids = [];
    const checkedInput = document.querySelectorAll("[input-change-id]:checked")
    checkedInput.forEach(input => {
      const id = input.getAttribute("input-change-id");
      ids.push(id);
    })

    const data = {
      ids: ids,
      status: status
    }

    fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data) // chuyển data thành dạng json để giao tiếp với backend
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          location.reload();
        }
      })

  })
}
// End Đổi nhiều trạng thái cùng lúc

// Xoá sản phẩm vĩnh viễn (xóa bản ghi khỏi database)

const permanentlyDeleteButton_list = document.querySelectorAll("[permanentlyDeleteButton]");
if (permanentlyDeleteButton_list.length > 0) {
  permanentlyDeleteButton_list.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?")

      if (isConfirm) {
        const id = button.getAttribute("itemID");
        const path = button.getAttribute("data-path");

        fetch(path, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({
            id: id
          }) // chuyển data thành dạng json để giao tiếp với backend
        })
          .then(res => res.json())
          .then(data => {
            if (data.code == "success") {
              location.reload();
            }
          })
      }
    })
  })
}
// End Xoá sản phẩm vĩnh viễn

// Thay đổi vị trí bản ghi
const listInputPOS = document.querySelectorAll("[input-pos]")
if (listInputPOS.length > 0) {
  listInputPOS.forEach(input => {
    input.addEventListener("change", () => {
      const position = parseInt(input.value)
      const path = input.getAttribute("data-path");
      const id = input.getAttribute("itemID");

      fetch(path, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(
          {
            id: id,
            position: position
          }
        ) // chuyển data thành dạng json để giao tiếp với backend
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == "success") {
            location.reload();
          }
        })
    })
  })

}
// End thay đổi vị trí bản ghi

// alert-message
const alertMessage = document.querySelector("[alert-message]")
if (alertMessage) {
  setTimeout(() => {
    alertMessage.style.display = "none"
  }, 3000)
}
// End alert-message

//Preview ảnh khi upload
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }

  })

  // console.log(uploadImageInput);
  // console.log(uploadImagePreview);
}
// End Preview ảnh khi upload

// Xóa tạm thời 1 bản ghi
const temporaryDelete_list = document.querySelectorAll("[deleteButton]");
if (temporaryDelete_list.length > 0) {
  console.log(temporaryDelete_list);
  temporaryDelete_list.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn chuyển sản phẩm này vào thùng rác?")

      if (isConfirm) {
        const itemID = button.getAttribute("itemID");
        const deleted_change = button.getAttribute("statusDelete")
        const data_path = button.getAttribute("data-path");

        const data = {
          id: itemID,
          deleted: deleted_change
        };
        console.log(data);

        fetch(data_path, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(data) // chuyển data thành dạng json để giao tiếp với backend
        })
          .then(res => res.json())
          .then(data => {
            if (data.code == "success") {
              location.reload();
            }
          })
      }
    })
  })
}
// End Xóa tạm thời 1 bản ghi

// Khôi phục 1 bản ghi đã bị xóa tạm thời
const restoreButton_list = document.querySelectorAll("[resButton]");
if (restoreButton_list.length > 0) {
  restoreButton_list.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn khôi phục bản ghi này");
      if (isConfirm) {
        const id = button.getAttribute("itemID");
        const deletedStatus = button.getAttribute("deletedStatus");
        const path = button.getAttribute("data-path")

        const data = {
          id: id,
          deleted: deletedStatus
        };

        fetch(path, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(data) // chuyển data thành dạng json để giao tiếp với backend
        })
          .then(res => res.json())
          .then(data => {
            if (data.code == "success") {
              location.reload();
            }
          })
      }
    })
  })
}

// end Khôi phục 1 bản ghi đã bị xóa tạm thời

// Sắp xếp
const sortSelect = document.querySelector("[sort-select]");
if (sortSelect) {
  let url = new URL(location.href); //nhân bản url, location.href là địa chỉ trang hiện tại
  // Bắt sự kiện onChange
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;

    if (value) {
      console.log(value);
      const [sortKey, sortValue] = value.split("-");
      console.log(sortKey);
      console.log(sortValue);

      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
    } else {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
    }

    location.href = url.href
  })

  // Hiển thị lựa chọn mặc định
  const sortKeyCurrent = url.searchParams.get("sortKey")
  const sortValueCurrent = url.searchParams.get("sortValue")
  if (sortKeyCurrent && sortValueCurrent) {
    sortSelect.value = `${sortKeyCurrent}-${sortValueCurrent}`;
  }

}
// End sắp xếp

// Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]")
  buttonSubmit.addEventListener("click", () => {
    const dataFinal = [];

    const listElementRoleID = document.querySelectorAll("[role-id]");
    listElementRoleID.forEach(elementRoleID => {
      const roleID = elementRoleID.getAttribute("role-id");

      const permissions = [];

      const listInputChecked = document.querySelectorAll(`input[data-id="${roleID}"]:checked`);

      listInputChecked.forEach(input => {
        const tr = input.closest(`tr[data-name]`);
        const name = tr.getAttribute("data-name");
        permissions.push(name);
      });
      // hàm closest() là để truy vấn thẻ cha
      dataFinal.push({
        id: roleID,
        permissions: permissions,
      });
    })
    const path = buttonSubmit.getAttribute("data-path");
    fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(dataFinal) // chuyển data thành dạng json để giao tiếp với backend
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          location.reload();
        }
      })
  });
  // Hiển thị mặc định trang phân quyền
  let dataPermissions = tablePermissions.getAttribute("table-permissions");
  dataPermissions = JSON.parse(dataPermissions);
  dataPermissions.forEach(item => {
    
    item.permissions.forEach(permission => {
      const input = document.querySelector(`tr[data-name="${permission}"] input[data-id="${item._id}"]`)
      input.checked = true;
    })
    
  })
  
  // End Hiển thị mặc định trang phân quyền
}
// End phân quyền