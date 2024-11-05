import useGetProfitByShipper from './useGetProfitByShipper'

const getMonthName = (dateString) => {
    try {
        const dateParts = dateString.split('/')
        const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
        return date.toLocaleString('default', { month: 'short' })
    } catch (error) {
        throw new Error('Invalid date string')
    }
}

const useGetDataTable = (shipperId) => {
    const { profit, isLoading, error, isFetching, refetch } = useGetProfitByShipper(shipperId)

    const reducedData = profit
        ? profit.reduce((acc, item) => {
              const month = getMonthName(item.Ngay)
              if (!acc[month]) {
                  acc[month] = 0
              }
              acc[month] += item.DoanhThu
              return acc
          }, {})
        : {}

    const formattedData = Object.keys(reducedData).map((month) => ({
        value: reducedData[month],
        frontColor: '#006DFF',
        gradientColor: '#009FFF',
        label: month,
    }))

    const maxValue = formattedData.reduce((max, item) => (item.value > max ? item.value : max), 0)

    return { dataTable: formattedData, maxValue, isLoading, error, isFetching, refetch }
}

export default useGetDataTable
