export async function getProducts() {
try{

    const response = await fetch("http://localhost:3001/productos");
    if (!response.ok) {
      throw new Error("Error en la petición");
    }const data = await response.json();
    return data;
    
} catch (error) {
    console.error(error);
    throw error;
}

}

export async function getCategories() {
  try {
    const response = await fetch("http://localhost:3001/categorias");
    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}