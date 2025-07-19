import { queryExample, queryExample2, queryNav, queryRunningShoes } from "./query";

export function getAlgoliaData() {
  // const url = 'populate[sectiontype][on][men-new-and-trending.new-arrivals][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ColorId][on][model-name.name][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*'
  // const url = 'populate[Metadata][on][men.product-specifications][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ColorId][on][model-name.name][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*'
  const url = 'populate[Metadata][on][men.product-specifications][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=10000'
  return queryExample(url)
    .then(res => {
      let arr = []
      res.data.forEach((i, n) => {
        let Media = []
        let ModelColors = []
        const { documentId, createdAt, ModelColors: ModelColors0, Metadata, DynamicSizes } = res.data[n]

        if (ModelColors0?.length !== 0) {
          ModelColors0.forEach((i, n) => {
            let objModelImage = []
            i?.ModelImage.forEach((i, n1) => {
              const { id, url, mime } = i
              objModelImage.push({ id: id, url: url, mime: mime })
            })
            const finalObj = { id: i.id, Title: i.Title, currentColor: i.currentColor, ModelImage: objModelImage }
            ModelColors.push(finalObj)
          })
        }

        const
          { Categories, Name, Price, Media: media0, Activity, Brand, Category,
            Collection, Color, Features, Gender, Material, ProductType, Sport, metaDescription } = Metadata[0]
        if (media0) {
          media0.forEach((i, index) => {
            const obj = { id: i.id, url: i.url }
            Media.push(obj)
          })
        }

        const metadata = {
          Categories, Name, Price, Media, Activity, Brand, Category,
          Collection, Color, Features, Gender, Material, ProductType, Sport, metaDescription
        }
        const data = { documentId, createdAt, ModelColors, DynamicSizes, metadata }
        arr.push(data)
      })

      let obj = { data: arr, meta: res.meta }

      return obj
    })
}

export function getStrapiData() {
  const url = 'populate[Metadata][on][men.product-specifications][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=10000'
 
  return queryExample(url)
    .then(res => {
      let arr = []
      res.data.forEach((i, n) => {
        let Media = []
        let ModelColors = []
        const { documentId, createdAt, ModelColors: ModelColors0, Metadata, DynamicSizes } = res.data[n]

        if (ModelColors0?.length !== 0) {
          ModelColors0.forEach((i, n) => {
            let objModelImage = []
            i?.ModelImage.forEach((i, n1) => {
              const { id, url, mime } = i
              objModelImage.push({ id: id, url: url, mime: mime })
            })
            const finalObj = { id: i.id, Title: i.Title, currentColor: i.currentColor, ModelImage: objModelImage }
            ModelColors.push(finalObj)
          })
        }

        const
          { Categories, Name, Price, Media: media0, Activity, Brand, Category,
            Collection, Color, Features, Gender, Material, ProductType, Sport, metaDescription } = Metadata[0]
        if (media0) {
          media0.forEach((i, index) => {
            const obj = { id: i.id, url: i.url }
            Media.push(obj)
          })
        }

        const metadata = {
          Categories, Name, Price, Media, Activity, Brand, Category,
          Collection, Color, Features, Gender, Material, ProductType, Sport, metaDescription
        }
        const data = { documentId, createdAt, ModelColors, DynamicSizes, metadata }
        arr.push(data)
      })

      let obj = { data: arr, meta: res.meta }

      return obj
    })
}

export function getExample() {
  const url = 'populate[sectiontype][on][men-new-and-trending.new-arrivals][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ColorId][on][model-name.name][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*'
  return queryExample(url)
    .then(res => res.data)
}

export function getExample2() {
  const url = 'e2fw5i8f35ge957d9yy4df1a&populate[sectiontype][on][men-new-and-trending.new-arrivals][populate]=*&populate[DynamicSizes][on][select-size-type.clothing][populate]=*&populate[ColorId][on][model-name.name][populate]=*&populate[ModelColors][on][product-overview.color][populate]=*'
  return queryExample2(url)
    .then(res => res.data)
}

export function getRunningShoesData() {
  return queryRunningShoes(`populate[0]=Media&populate[1]=SelectSizeType.MenAndWomenSizes&populate[2]=ShortDescription`)
    .then(res => res.data)
}

export function getNavData() {
  // return queryNav(`populate[0]=MensSection.NewAndTrending&populate[1]=MensSection.Shoes&populate[2]=MensSection.Clothing&populate[3]=MensSection.Accesories&populate[4]=MensSection.ShopBySport&populate[5]=MensSection.ShopByCollection&populate[6]=WomenSection.NewAndTrending&populate[7]=WomenSection.Shoes&populate[8]=WomenSection.Clothing&populate[9]=WomenSection.Accesories&populate[10]=WomenSection.ShopBySport&populate[11]=WomenSection.ShopByCollection&populate[12]=KidsSection.NewAndTrending&populate[13]=KidsSection.BoysShoes&populate[14]=KidsSection.BoysClothing&populate[15]=KidsSection.GirlsShoes&populate[16]=KidsSection.GirlsClothing&populate[17]=KidsSection.BabiesAndToddlers&populate[18]=KidsSection.ShopByAge&populate[19]=KidsSection.ShopByColor&populate[20]=KidsSection.Accesories&populate[21]=KidsSection.ShopBySport&populate[22]=SaleSection.FeaturedSale&populate[23]=SaleSection.Men&populate[24]=SaleSection.Women&populate[25]=SaleSection.Kids`)
  return queryNav(`populate[0]=MensSection.NewAndTrending&populate[1]=MensSection.Shoes&populate[2]=MensSection.Clothing&populate[3]=MensSection.Accesories&populate[4]=MensSection.ShopBySport&populate[5]=MensSection.ShopByCollection&populate[6]=WomenSection.NewAndTrending&populate[7]=WomenSection.Shoes&populate[8]=WomenSection.Clothing&populate[9]=WomenSection.Accesories&populate[10]=WomenSection.ShopBySport&populate[11]=WomenSection.ShopByCollection&populate[12]=KidsSection.NewAndTrending&populate[13]=KidsSection.BoysShoes&populate[14]=KidsSection.BoysClothing&populate[15]=KidsSection.GirlsShoes&populate[16]=KidsSection.GirlsClothing&populate[17]=KidsSection.BabiesAndToddlers&populate[18]=KidsSection.ShopByAge&populate[19]=KidsSection.ShopByColor&populate[20]=KidsSection.Accesories&populate[21]=KidsSection.ShopBySport&populate[22]=SaleSection.FeaturedSale&populate[23]=SaleSection.Men&populate[24]=SaleSection.Women&populate[25]=SaleSection.Kids&populate[26]=NewAndTrendingSection.WhatsNew&populate[27]=NewAndTrendingSection.Collaborations&populate[28]=NewAndTrendingSection.OurWorld&populate[29]=NewAndTrendingSection.Sport&populate[30]=NewAndTrendingSection.Originals&populate[31]=NewAndTrendingSection.Collections`) 
  .then(res => res.data)
}