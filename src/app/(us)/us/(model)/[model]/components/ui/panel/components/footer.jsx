import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";

const menuItems = {
  Products: [
    "Shoes",
    "Clothing",
    "Accessories",
    "Gift Cards",
    "New Arrivals",
    "Best Sellers",
    "Release Dates",
    "Sale",
    "Sports",
    "Soccer",
    "Running",
    "Basketball",
    "Football",
    "Outdoor",
    "Golf",
    "Baseball",
    "Tennis",
    "Skateboarding",
    "Training",
    "Collections",
    "adicolor",
    "Ultraboost",
    "Forum",
    "Superstar",
    "Running Shoes",
    "adilette",
    "Stan Smith",
    "adizero",
    "Tiro",
    "Cloudfoam Pure"
  ],
  Collections: [
    "adicolor",
    "Ultraboost",
    "Forum",
    "Superstar",
    "Running Shoes",
    "adilette",
    "Stan Smith",
    "adizero",
    "Tiro",
    "Cloudfoam Pure"
  ],
  Sports: [
    "Soccer",
    "Running",
    "Basketball",
    "Football",
    "Outdoor",
    "Golf",
    "Baseball",
    "Tennis",
    "Skateboarding",
    "Training"
  ],
  Support: [
    "Help",
    "Returns & Exchanges",
    "Shipping",
    "Order Tracker",
    "Store Locator",
    "Size Charts",
    "Gift Card Balance",
    "How to Clean Shoes",
    "Bra Fit Guide",
    "Breathing for Running",
    "Promotions",
    "Sitemap"
  ],
  CompanyInfo: [
    "About Us",
    "Student Discount",
    "Military & Healthcare Discount",
    "adidas Stories",
    "adidas Apps",
    "Impact",
    "People",
    "Planet",
    "adiClub",
    "Affiliates",
    "Press",
    "Careers",
    "California Transparency in Supply Chains Act",
    "Responsible Disclosure",
    "Transparency in Coverage"
  ],
  "FOLLOW US": [
    "FACEBOOK",
    "INSTAGRAM",
    "X",
    "PINTEREST",
    "TIKTOK",
    "YOUTUBE"
  ]
};
const l = Object.entries(menuItems).length

  const alArr = [
    "Help",
    "adiClub",
    "Returns & Exchanges",
    "Store Finder",
    "Order Tracker",
    "Gift Cards",
    "Shipping",
    "adidas Apps",
    "Promotions",
    "Size Charts",
    "Sitemap",
  ]

export default function Footer() {
  const l = Object.entries(menuItems).length

  return (
    <div
      className="w-full flex flex-col gap-6 justify-center items-center bg-black text-white"
    >
      <div
        className="lg:flex flex-row justify-between w-fit hidden gap-x-5 xl:gap-x-16"
      >
        {Object.entries(menuItems).map(([sectionKey, items], n) => (
          <div 
            className={`w-[140px] flex justify-start items-center flex-col`}
          key={sectionKey}
          >
            <div
              className="flex flex-col"
            >
              <div
                className="my-5"
              >
                <h3
                  className="font-bold text-[16px]"
                >
                  {sectionKey}
                </h3>
              </div>
              <ul
                className="text-[13px] gap-5 flex flex-col"
              >
                {items.map((item) => (
                  <li key={`${sectionKey}-${item}`}>
                    {
                      sectionKey === 'FOLLOW US' ?
                        item === "X" ? <RiTwitterXLine size={30} /> :
                          item === "INSTAGRAM" ? <FaInstagram size={30} /> :
                            item === "FACEBOOK" ? <IoLogoFacebook size={30} /> :
                              item === "PINTEREST" ? <FaPinterest size={30} /> :
                                item === "TIKTOK" ? <SiTiktok size={30} /> :
                                  item === "YOUTUBE" ? <FaYoutube size={30} />
                                    : null
                        : item
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-full border-t border-white/20 justify-center flex py-8 items-center"
      >
        <div
          className="flex flex-col gap-6 justify-between items-center text-[14px] w-fit"
        >
          <ul
            className="flex flex-row items-center justify-between w-full"
          >
            <li
              className="pr-4 underline underline-offset-8 decoration-1"
            >
              Your Privacy Choices
            </li>
            <li
              className="px-4 border-x border-white/40"
            >
              Privacy Policy
            </li>
            <li
              className="pl-4"
            >
              Terms and Conditions
            </li>
          </ul>
          <h1>
            © 2025 adidas America, Inc.
          </h1>
        </div>
      </div>
    </div>

  )
}