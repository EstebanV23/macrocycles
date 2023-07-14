import { useFonts as useQuick, Quicksand_700Bold, Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand'
import { useFonts as useRubik, Rubik_700Bold } from '@expo-google-fonts/rubik'

export default function useLoadFonts () {
  const [quick] = useQuick({
    Quicksand_700Bold,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  })
  const [rubik] = useRubik({ Rubik_700Bold })
  return [quick, rubik]
}
