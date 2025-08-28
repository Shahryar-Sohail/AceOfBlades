import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/slices/productSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



type Product = {
    id: string;
    title: string;
    availableStock: number;
};



export default function Chart() {

    const [titles, setTitles] = useState<string[]>([]);
    const [stocks, setStocks] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchData = async () => {
            const products = await dispatch(fetchProducts()).unwrap() as Product[];
            setTitles(products.map((product) => product.title));
            setStocks(products.map((product) => product.availableStock));
        };
        fetchData();
    }, [dispatch]);

    const getRandomColor = () =>
        `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;



    const data = {
        labels: titles,
        datasets: [
            {
                label: "Stock 📦",
                data: stocks,
                backgroundColor: titles.map(() => getRandomColor()),
                barThickness: 30,       
                hoverBackgroundColor: getRandomColor,
                hoverBorderColor: getRandomColor,
                minBarLength: 5,        
                borderRadius: 10,       


            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: !(typeof window !== "undefined" && window.innerWidth < 768), 
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Sales" },
        },

    };




    return <Bar data={data} options={options} />;
}
