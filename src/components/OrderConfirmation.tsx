import type { Order } from "../api/types";

export function OrderConfirmation({ order, onDismiss }: { order: Order; onDismiss: () => void }) {
  return (
    <aside className="cart">
      <h2>Order confirmed</h2>
      <p className="order-confirmation__id">Order #{order.id}</p>
      <ul className="cart__lines">
        {order.items.map((item) => {
          const product = order.products.find((p) => p.id === item.productId);
          return (
            <li key={item.productId} className="cart__line">
              <div className="cart__line-info">
                <span className="cart__line-name">
                  {product?.name ?? `Product ${item.productId}`} × {item.quantity}
                </span>
                {product && (
                  <span className="cart__line-price">${(product.price * item.quantity).toFixed(2)}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={onDismiss}>
        Order more
      </button>
    </aside>
  );
}
