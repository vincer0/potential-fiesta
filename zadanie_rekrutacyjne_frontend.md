Zadanie Rekrutacyjne - Live Sportsbook Dashboard
================================================

# Cel zadania
Twoim celem jest stworzenie uproszczonej aplikacji bukmacherskiej (Sportsbook), która wyświetla listę dostępnych meczów oraz pozwala użytkownikowi dodać zakłady do kuponu (Bet Slip).

Aplikacja powinna symulować zachowanie "Live", gdzie kursy mogą ulegać zmianie w czasie rzeczywistym.

## Wymagania Techniczne
- Framework: Next.js (zalecany App Router).
- Styling: Tailwind CSS.
- Język: TypeScript.
- Stan: Dowolny (Zustand, Context API, Redux Toolkit - wybierz to, co uważasz za słuszne).

## Zakres Zadania
Zadanie zostało podzielone na poziomy zaawansowania. Wykonaj tyle punktów, ile zdążysz w założonym czasie. Jakość kodu i architektura są ważniejsze niż wykonanie wszystkich punktów "na szybko".

### Poziom 1: Lista Meczów i Layout
1. Pobierz dane z załączonego pliku `betting_dashboard_data.json`.
2. Wyświetl listę meczów. Każdy element listy powinien zawierać:
3. Nazwy drużyn (np. "Burnley - Manchester United").
   - Datę/Godzinę rozpoczęcia.
   - Przyciski z kursami dla zakładu "1x2" (Wygrana Gospodarzy / Remis / Wygrana Gości).
4. Zadbaj o responsywny layout:
   - Desktop: Lista meczów po lewej, Kupon (Bet Slip) po prawej.
   - Mobile: Kupon zwijany lub dostępny jako overlay.

Przykładowy wygląd dostępny w pliku `betting_dashboard_design_example.png`.

### Poziom 2: Funkcjonalność Kuponu
1. Kliknięcie w przycisk z kursem dodaje zakład do Kuponu.
2. Logika walidacji:
- Nie można dodać tego samego zakładu dwa razy.
- Nie można dodać sprzecznych zakładów z tego samego meczu (np. nie można postawić jednocześnie na wygraną Burnley i wygraną Manchesteru). Próba dodania powinna podmienić stary zakład na nowy lub wyświetlić komunikat.
3. W kuponie użytkownik może wpisać stawkę (Stake). Aplikacja powinna automatycznie wyliczyć ewentualną wygraną (Total Odds * Stake).

### Poziom 3: Symulacja Live Data
Bukmacherka to dane "na żywo". Ponieważ nie mamy dostępu do prawdziwego WebSocketa, musisz go zsymulować.
1. Stwórz mechanizm, który co pewien interwał (np. 10-15 sekund) aktualizuje kursy w wybranych meczach.
2. Kursy powinny zmieniać się nieznacznie (np. mnożnik losowy od 0.9 do 1.1).
3. Wizualizacja zmian: Gdy kurs na liście ulegnie zmianie, przycisk powinien "mignąć" odpowiednim kolorem (np. Zielony = wzrost kursu, Czerwony = spadek).
4. Obsługa Kuponu: Jeśli kurs zakładu znajdującego się już na kuponie ulegnie zmianie, użytkownik musi zostać o tym poinformowany (np. zmiana koloru kursu na kuponie, blokada przycisku "Postaw", wymóg zaakceptowania nowych kursów).

### Poziom 4: Optymalizacja
Zadbaj o to, aby częste aktualizacje kursów (z Poziomu 3) nie powodowały re-renderowania całej listy meczów ani całej aplikacji.

1. Powinien renderować się tylko ten komponent kursu/meczu, który faktycznie uległ zmianie.
2. Możesz wykorzystać narzędzia React Profiler lub console.log w komponentach, aby udowodnić optymalizację. 

## Struktura danych (Wskazówki)
Plik json zawiera tablicę eventów. Kluczowe pola:
- eventName: Nazwa spotkania.
- eventStart: Timestamp startu
- eventGames: Tablica dostępnych gier. Interesuje nas gra, gdzie gameName to "1x2". 
  - Wewnątrz gry znajdziesz outcomes (możliwe wyniki), gdzie outcomeOdds to kurs.

## Dostarczanie rozwiązania
Rozwiązanie prześlij jako link do repozytorium Git (GitHub/GitLab/Bitbucket) lub jako spakowane archiwum ZIP. W repozytorium powinien znaleźć się krótki plik README z instrukcją uruchomienia.

Powodzenia!
