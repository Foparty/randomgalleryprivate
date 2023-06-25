const galleryContainer = document.getElementById('app');

const fetchData = async () => {
	try {
		const response = await fetch(
			'https://api.unsplash.com/search/photos/?query=cars&client_id=YUelOWexOkSRXsIlPYB95pSPyKaYXb3Kv-Dl3fVzutA&page=2&per_page=30'
		);
		const data = await response.json();
		return data.results;
	} catch (error) {
		alert('ERROR FETCHING DATA:', error);
		console.error('ERROR FETCHING DATA:', error);
		throw error;
	}
};

function createImageContainer() {
	const imgCont = document.createElement('div');
	imgCont.classList = 'img-container';
	return imgCont;
}

function createImageElement(src) {
	const image = document.createElement('img');
	image.src = src;
	return image;
}

async function displayImages() {
	try {
		const imagesData = await fetchData();
		console.log(imagesData.results);
		const rows = 1000;

		// Object.values(imagesData.results)
		imagesData.slice(0, rows).map((image) => {
			const imgCont = createImageContainer();
			imgCont.style.gridColumn = `span ${Math.floor(Math.random() * 1) + 4}`;
			imgCont.style.gridRow = `span ${Math.floor(Math.random() * 9) + 1}`;

			const imageElement = createImageElement(image.urls.regular);
			imgCont.appendChild(imageElement);
			galleryContainer.appendChild(imgCont);

			// Intersection Observer for slide animation
			const options = {
				threshold: 0.5, // Adjust the threshold as per your preference
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('slide-in');
						observer.unobserve(entry.target); // Stop observing after the animation is applied
					}
				});
			}, options);

			observer.observe(imgCont);
		});
	} catch (error) {
		console.error('Error displaying images:', error);
		// Handle the error gracefully (e.g., display an error message to the user)
	}
}

displayImages();
