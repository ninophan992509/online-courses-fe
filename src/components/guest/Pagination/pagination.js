import { Pagination } from "react-bootstrap";
import "./pagination.css";

const PaginationCustom = ({ active, numberPage, onClickPageItem }) => {
  return (
    <Pagination className="page-cs">
      <Pagination.Prev
        disabled={active === 1}
        onClick={() => onClickPageItem("-1")}
      >
        {"<"}
      </Pagination.Prev>
      {(numberPage < 4 || active === 1) && (
        <>
          {Array.from({ length: numberPage < 4 ? numberPage : 3 }).map(
            (e, i) => (
              <Pagination.Item
                key={i + 1}
                active={active === i + 1}
                onClick={() => onClickPageItem(`${i + 1}`)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        </>
      )}
      {numberPage > 3 && active > 1 && active < numberPage && (
        <>
          <Pagination.Item onClick={() => onClickPageItem(`${active - 1}`)}>
            {active - 1}
          </Pagination.Item>
          <Pagination.Item active onClick={() => onClickPageItem(`${active}`)}>
            {active}
          </Pagination.Item>
          <Pagination.Item onClick={() => onClickPageItem(`${active + 1}`)}>
            {active + 1}
          </Pagination.Item>
        </>
      )}
      {numberPage > 3 && active === numberPage && (
        <>
          <Pagination.Item onClick={() => onClickPageItem(`${active - 2}`)}>
            {active - 2}
          </Pagination.Item>
          <Pagination.Item onClick={() => onClickPageItem(`${active - 1}`)}>
            {active - 1}
          </Pagination.Item>
          <Pagination.Item active onClick={() => onClickPageItem(`${active}`)}>
            {active}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next
        disabled={active === numberPage}
        onClick={() => onClickPageItem(`+1`)}
      >
        {">"}
      </Pagination.Next>
    </Pagination>
  );
};

export default PaginationCustom;
