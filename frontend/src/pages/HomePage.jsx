import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";


function HomePage() {
  return (

    <MainLayout>
        <div className="bg=light p-5 mt-4 rounded-3">
        <h1>Welcome to Point Of System</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa
              eaque nostrum expedita rerum, magnam inventore molestiae nemo
              aspernatur dignissimos, minus animi voluptatem cupiditate,
              recusandae quia ab aliquid ipsam praesentium!
            </p>
            <Link to='/pos' className="btn btn-primary">Click Here</Link>
        </div>
    </MainLayout>

  );
}

export default HomePage;
