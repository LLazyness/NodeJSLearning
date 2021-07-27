const deleteProduct = (btn) => {
    const csrf = btn.parentNode.querySelector('input[name="_csrf"]').value;
    const prodId = btn.parentNode.querySelector('input[name="productId"]').value;

    const productElement = btn.closest('article');

    fetch('/admin/product/' + prodId, {
        method: "DELETE",
        headers: {
            'csrf-token': csrf
        }
    })
        .then(() => {
            productElement.remove();
        })
        .catch(err => {
            console.log(err);
        }) 
};