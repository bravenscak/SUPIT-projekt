async function fetchCurriculumData() {
    try {
        const token = sessionStorage.getItem("token");
        const response = await fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching curriculum data:', error);
    }
}
fetchCurriculumData();

async function fetchCurriculumById(id) {
    try {
        const token = sessionStorage.getItem("token");
        const url = `https://www.fulek.com/data/api/supit/get-curriculum/${id}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        alert(`Error fetching curriculum data for ID ${id}:`, error);
    }
}

async function suggestNames(inputElement, suggestionsElement, tableBodyElement) {
    let data;
    try {
        data = await fetchCurriculumData();
    } catch (error) {
        alert('Failed to fetch curriculum data:', error);
        return;
    }

    inputElement.addEventListener('input', () => {
        const inputValue = inputElement.value.toLowerCase();
        const filteredSuggestions = data.data.filter(item => item.kolegij.toLowerCase().includes(inputValue));

        suggestionsElement.innerHTML = '';

        filteredSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = suggestion.kolegij;
            suggestionsElement.appendChild(suggestionElement);

            suggestionElement.addEventListener('click', async () => {
                inputElement.value = suggestion.kolegij;
                suggestionsElement.innerHTML = '';
                await addCurriculumToTable(suggestion.kolegij, tableBodyElement); 
                inputElement.value = ''; 
            });
        });
    });
}

async function addCurriculumToTable(curriculumName, tableBodyElement) {
    let curriculumData;
    try {
        const data = await fetchCurriculumData();
        curriculumData = data.data.find(item => item.kolegij.toLowerCase() === curriculumName.toLowerCase());
    } catch (error) {
        alert('Failed to fetch curriculum data:', error);
        return;
    }

    if (!curriculumData) {
        alert('Selected curriculum not found in the data');
        return;
    }

    const existingRows = tableBodyElement.querySelectorAll('tr');
    for (let row of existingRows) {
        if (row.querySelector('td').textContent.toLowerCase() === curriculumData.kolegij.toLowerCase()) {
           alert('Curriculum already added to the table');
            return;
        }
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${curriculumData.kolegij}</td>
        <td>${curriculumData.ects}</td>
        <td>${curriculumData.sati}</td>
        <td>${curriculumData.predavanja}</td>
        <td>${curriculumData.vjezbe}</td>
        <td>${curriculumData.tip}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeCurriculumFromTable(this)">Remove</button></td>
    `;

    tableBodyElement.appendChild(newRow);


    updateSumRow(tableBodyElement);

    toggleTableVisibility(tableBodyElement);

}

function updateSumRow() {
    let ectsTotal = 0;
    let satiTotal = 0;
    let predavanjaTotal = 0;
    let vjezbeTotal = 0;

    const rows = tableBodyElement.querySelectorAll('tr:not(#sum-row)');
    rows.forEach(row => {
        ectsTotal += parseInt(row.cells[1].textContent) || 0;
        satiTotal += parseInt(row.cells[2].textContent) || 0;
        predavanjaTotal += parseInt(row.cells[3].textContent) || 0;
        vjezbeTotal += parseInt(row.cells[4].textContent) || 0;
    });

    const sumRow = document.querySelector('#sum-row');
    sumRow.cells[1].textContent = ectsTotal;
    sumRow.cells[2].textContent = satiTotal;
    sumRow.cells[3].textContent = predavanjaTotal;
    sumRow.cells[4].textContent = vjezbeTotal;
}

function removeCurriculumFromTable(button) {
    const row = button.parentNode.parentNode;
    const tableBody = row.parentNode; 
    row.parentNode.removeChild(row);
    updateSumRow();
    toggleTableVisibility(tableBody); 
}

const inputElement = document.getElementById('input-curriculums');
const suggestionsElement = document.getElementById('autocomplete-suggestions');
const tableBodyElement = document.getElementById('curriculums-table-body');
suggestNames(inputElement, suggestionsElement, tableBodyElement);

function toggleTableVisibility(tableBody) {
    const table = document.querySelector('.curriculums-table'); 
    if (tableBody.children.length === 1 && tableBody.querySelector('#sum-row') || tableBody.children.length === 0) {
        table.style.display = 'none';
    } else {
        table.style.display = ''; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleTableVisibility(tableBodyElement);
    isTokenValid();
});

function isTokenValid() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = 'index.html';
    }
}