import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Watchlist from "../Pages/Watchlist";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const { movies, loading, error } = useSelector((store)=>store.movies)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchlist" element={<PrivateRoute><Watchlist data={movies || []} /></PrivateRoute>}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AllRoutes;
