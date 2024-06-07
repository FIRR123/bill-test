import { createBrowserRouter } from "react-router-dom";
import LayOut from "@/pages/Layout";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import News from "@/pages/News";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LayOut />,
      children: [
        {
          path: 'month',
          element: <Month />
        },
        {
          path: 'year',
          element: <Year />
        }
      ]
    },
    {
      path: '/new',
      element: <News />
    }
  ]
)

export default router;