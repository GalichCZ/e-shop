import './index.scss'
const ProductCard = () => {
  return (
    <div data-testid="product-card" className="card">
      <h3>Title</h3>
      <div className="card_image">
        <img
          src="https://image.alza.cz/products/PSV0103/PSV0103.jpg?width=190&height=190"
          alt="Image"
        />
      </div>
      <div>Rating</div>
      <b>1900 $</b>
      <div className="card_tag">
        <a>#tag</a>
        <a>#tag</a>
      </div>
      <button>Add to cart</button>
    </div>
  )
}

export default ProductCard
