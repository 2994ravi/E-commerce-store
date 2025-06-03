import CategoryItem from "../components/CategoryItem";
const categories = [
	{ href: "/Chicken Feed", name: "Chicken Feed", imageUrl: "/chicken.jpg" },
	{ href: "/Fish Feed", name: "Fish Feed", imageUrl: "/fish.jpg" },
	{ href: "/Cattle Feed", name: "Cattle Feed", imageUrl: "/cattle.jpeg" },
	{ href: "/Pig Feed", name: "Pig Feed", imageUrl: "/pig.jpg" },
	
];




const HomePage = () => {
	//const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	//useEffect(() => {
		//fetchFeaturedProducts();
	//}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Premium Feed Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
				Supporting farmers with reliable nutrition solutions since 1990
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

		
			</div>
		</div>
	);
};
export default HomePage;
