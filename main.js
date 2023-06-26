const galleryContainer = document.getElementById('app');
const perPage = 30;
const totalPages = 10; // Number of pages you want to fetch
// const term = ['cars', 'love', 'beach', 'family', 'planets', 'cake'];
const term = 'paradise';

const fetchData = async (page) => {
	try {
		const response = await fetch(
			`https://api.unsplash.com/search/photos/?query=${term}&client_id=YUelOWexOkSRXsIlPYB95pSPyKaYXb3Kv-Dl3fVzutA&page=${page}&per_page=${perPage}`
		);
		const data = await response.json();
		return data.results;
	} catch (error) {
		// alert(`ERROR FETCHING DATA: ${error}`);
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
		for (let page = 1; page <= totalPages; page++) {
			const imagesData = await fetchData(page);
			console.log(imagesData);

			imagesData.forEach((image) => {
				const imgCont = createImageContainer();
				imgCont.style.gridColumn = `span ${Math.floor(Math.random() * 4) + 1}`;
				imgCont.style.gridRow = `span ${Math.floor(Math.random() * 6) + 1}`;

				const imageElement = createImageElement(image.urls.regular);
				imgCont.appendChild(imageElement);
				galleryContainer.appendChild(imgCont);

				const options = {
					threshold: 0.3,
				};

				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('slide-in');
							observer.unobserve(entry.target);
						}
					});
				}, options);

				observer.observe(imgCont);
			});
		}
	} catch (error) {
		console.error('Error displaying images:', error);
	}
}

displayImages();
