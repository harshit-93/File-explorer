import { useState } from "react";
import styled from "styled-components";

const productData = {
  id: "SR0160AQ",
  title: "Classic Aquamarine and Diamond Three Stone Engagement Ring",
  base_price: 237589,
  exclusive_offer: "Get 20% off on making charges",
  reviews: 7,
  images: [
    "https://assets.angara.com/band/wrsd_sr2276rd/5mm-a-ruby-rose-gold-band_3.jpg?width=1440&quality=85&auto=webp",
    "https://assets.angara.com/band/wrsd_sr2276rd/5mm-a-ruby-rose-gold-band_2.jpg?width=1440&quality=85&auto=webp",
    "https://assets.angara.com/band/wrsd_sr2276rd/5mm-a-ruby-rose-gold-band.jpg?width=1440&quality=85&auto=webp",
    "https://assets.angara.com/india/Box_Images/greybox-ring.jpg?width=1440&quality=85&auto=webp",
  ],
  variations: {
    gemstone: ["Aquamarine", "Diamond", "Sapphire"],
    quality: ["Good", "Better", "Best", "Heirloom"],
    metal: ["White Gold", "Yellow Gold", "Rose Gold"],
    carat_weight: [1.5, 1.8, 2.0],
    ring_size: [6, 7, 8, 9, 10],
  },
  price_breakdown: {
    metal: { rate: 4567, weight: 3.87, value: 18528 },
    stones: [
      { type: "Aquamarine", carat: 1.12, value: 62748 },
      { type: "Diamond", carat: 0.46, value: 143175 },
    ],
    making_charges: 6218,
    subtotal: 230669,
    gst: 6920,
    grand_total: 237589,
  },
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [selectedOptions, setSelectedOptions] = useState({
    gemstone: "Aquamarine",
    quality: "Good",
    metal: "White Gold",
    carat_weight: 1.5,
    ring_size: 6,
  });

  const handleOptionChange = (category, value) => {
    setSelectedOptions({ ...selectedOptions, [category]: value });
  };

  const addedToCart = () => {
    alert("Product Added to Cart !!");
  };

  return (
    <>
      <head>
        <title>Jewelry Store</title>
        <meta name="description" content="Shop for jewelry" />
        <meta name="keywords" content="ring, jewelry, necklace" />
      </head>
      <Container>
        <ImageSection>
          <MainImage src={selectedImage} alt="Product" />
          <ThumbnailWrapper>
            {productData.images.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </ThumbnailWrapper>
        </ImageSection>
        <InfoSection>
          <Title>{productData.title}</Title>
          <Price>Price: ₹{productData.base_price}</Price>
          <Offer>{productData.exclusive_offer}</Offer>
          <DropdownContainer>
            {Object.keys(productData.variations).map((key) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
                <select
                  value={selectedOptions[key]}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                >
                  {productData.variations[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </DropdownContainer>
          <PriceBreakdown>
            <h3>Price Breakdown</h3>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Weight</th>
                  <th>Rate</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Metal</td>
                  <td>{productData.price_breakdown.metal.weight}g</td>
                  <td>₹{productData.price_breakdown.metal.rate}</td>
                  <td>₹{productData.price_breakdown.metal.value}</td>
                </tr>
                {productData.price_breakdown.stones.map((stone, index) => (
                  <tr key={index}>
                    <td>{stone.type}</td>
                    <td>{stone.carat}ct</td>
                    <td>-</td>
                    <td>₹{stone.value}</td>
                  </tr>
                ))}
                <tr>
                  <td>Making Charges</td>
                  <td>-</td>
                  <td>-</td>
                  <td>₹{productData.price_breakdown.making_charges}</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td>-</td>
                  <td>-</td>
                  <td>₹{productData.price_breakdown.subtotal}</td>
                </tr>
                <tr>
                  <td>GST</td>
                  <td>-</td>
                  <td>-</td>
                  <td>₹{productData.price_breakdown.gst}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Grand Total</strong>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <strong>₹{productData.price_breakdown.grand_total}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </PriceBreakdown>
          <button onClick={addedToCart}>Add to Bag</button>
        </InfoSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  display: block;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  overflow-x: auto;
`;

const Thumbnail = styled.img`
  width: 80px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const PriceBreakdown = styled.div`
  margin: 20px 0;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #53c4ea;
  margin: 10px 0;
`;

const Offer = styled.p`
  font-size: 18px;
  color: green;
  margin: 10px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  color: black;
  margin: 20px 0;
`;

