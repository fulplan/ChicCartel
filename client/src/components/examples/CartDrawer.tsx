import CartDrawer from '../CartDrawer';
import { useState } from 'react';
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';

export default function CartDrawerExample() {
  const [isOpen, setIsOpen] = useState(true);

  const items = [
    { id: '1', name: 'Minimalist Black Coat', price: 299, quantity: 1, image: coat, size: 'M' },
    { id: '2', name: 'Cashmere Sweater', price: 189, quantity: 2, image: sweater, size: 'L' },
  ];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Cart</button>
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemoveItem={(id) => console.log('Remove item:', id)}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
