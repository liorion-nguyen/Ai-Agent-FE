export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'creditCard' | 'paypal' | 'bankTransfer';
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    totalPrice: number;
    productName: string;
    productImageUrl?: string;
    productDescription?: string;
    productInStock: boolean;
    productCategory?: string;
    productBrand?: string;
    productRating?: number;
    productReviews?: number;
    productDiscount?: number;
    productDiscountedPrice?: number;
    productDiscountedPriceFormatted?: string;
    productPriceFormatted?: string;
    productImageUrls?: string[];
    productVideoUrl?: string;
    productDimensions?: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
  };
}
