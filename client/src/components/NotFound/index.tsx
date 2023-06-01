import { Link } from 'react-router-dom';

type NotFoundProps = {
  toPath: string;
};

const NotFound = ({ toPath }: NotFoundProps) => (
  <div className="text-center my-5">
    <h1 className="h2 mb-5">
      404 <br />
      Page Not Found
    </h1>
    <p>Sorry, the page you were looking for does not exist.</p>
    <p className="my-3">Go To Homepage by Button Below</p>
    <Link to={toPath} replace className="btn btn-outline-primary">
      Home Page
    </Link>
  </div>
);

export default NotFound;
