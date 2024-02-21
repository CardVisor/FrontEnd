import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import NFTBenefit from "./NFTBenefit";
function Combination({ newCombination }) {
  useEffect(() => {
    console.log("조합배열: Combination에서 호출");
    console.log(newCombination);
  }, [newCombination]);

  return (
    <>
      {newCombination &&
        newCombination.map((benefit, index) => (
          <Grid
            key={index}
            mb="30px"
            mr="60px"
            ml="60px"
            templateColumns={{
              base: "1fr",
              lg: "2fr 3.5fr",
            }}
            templateRows={{
              base: "repeat(1, 5fr)",
              lg: "5fr",
            }}
            gap={{ base: "50px", xl: "20px" }}
          >
            <NFTBenefit key={index} data={benefit} />
          </Grid>
        ))}
    </>
  );
}

export default Combination;
