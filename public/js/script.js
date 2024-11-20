
// alert-message
const alertMessage = document.querySelector("[alert-message]")
if (alertMessage) {
  setTimeout(() => {
    alertMessage.style.display = "none"
  }, 3000)
}
// End alert-message

// table-cart
const tableCart = document.querySelector("[table-cart]")
if(tableCart){
  const listInputQuantity = tableCart.querySelectorAll("input[name='quantity']");
  listInputQuantity.forEach(input => {
    input.addEventListener("change", () => {
      const productID = input.getAttribute("item-id");
      
      const quantity = input.value;
    
      fetch("/cart/update", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          productID: productID,
          quantity: quantity
        }) // chuyển data thành dạng json để giao tiếp với backend
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
// table-cart