import "@/styles/Product.module.css";

import Comments from "@/components/templates/Product/Comments";
import ProductsDetails from "@/components/templates/Product/ProductDetails";

const Product = ({ product, comments }) => {
  return (
    <>
      <ProductsDetails data={product} />
      <Comments data={comments} />
    </>
  );
};

export async function getStaticPaths(context) {
  const res = await fetch(`process.env/menu`);
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const productResponse = await fetch(
    `${process.env.url}/menu/${params.id}`
  );
  const productData = await productResponse.json();

  const commentsResponse = await fetch(`${process.env.url}/comments`);
  const comments = await commentsResponse.json();

  const productComments = comments.filter(
    (comment) => comment.productID === +params.id
  );

  return {
    props: {
      product: productData,
      comments: productComments,
    },
    revalidate: 60 * 60 * 12, // Second
  };
}

export default Product;
