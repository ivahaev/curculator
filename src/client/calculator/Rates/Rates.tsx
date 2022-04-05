import React from "react";
import classnames from "classnames";
import { useRates } from "../../hooks/useRates";
import { useCodes } from "../../hooks/useCodes";

const Rates: React.FC = () => {
  const { currentRates, fetching } = useRates();
  const { setBaseCode } = useCodes();
  const handleRowClick = (code: string) => setBaseCode(code);

  return (
    <table className={classnames({ loading: fetching })}>
      <thead>
        <tr>
          <th>Currency</th>
          <th className="width100">Rate</th>
        </tr>
      </thead>
      <tbody>
        {currentRates.map((rate) => (
          <tr
            key={rate.code}
            className="c-pointer"
            onClick={() => handleRowClick(rate.code)}
          >
            <td className="p- r">{rate.label}</td>
            <td>{rate.rate.toFixed(5).replace(/\.?0*$/, "")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Rates;
