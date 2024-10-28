import {buildSearchParamString, deletePosition, getAllPositions} from "@/lib/actions";
import Table from "@/components/table/table";
import {redirect} from "next/navigation";
import {PositionColumns} from "@/components/table/columns/position-column";
import {Position} from "@/lib/models/position";

type PositionListPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default async function PositionListPage({searchParams}: PositionListPageProps) {
    if (!searchParams['offset'] || !searchParams['limit']) {
        initialPageParams(searchParams);
    }

    const parsedOffset = parseInt(searchParams['offset'] as string);
    const parsedLimit = parseInt(searchParams['limit'] as string);

    async function getData() {
        const data = await getAllPositions(parsedOffset, parsedLimit);
        return data.data as Position[] ?? [];
    }

    async function viewClick(item: Record<string, any>) {
        'use server'
        redirect(`/position/${item.id}`);
    }

    async function deleteClick(item: Record<string, any>) {
        'use server'
        await deletePosition(item.id);
        redirect(`/position?offset=${parsedOffset}&limit=${parsedLimit}`);
    }


    return (
        <div>
            <div className="mt-4">
                <Table
                    columns={PositionColumns}
                    data={[]}
                    title="Position List"
                    onViewButtonClick={viewClick}
                    onDeleteButtonClick={deleteClick}
                    getData={getData}
                />
            </div>
        </div>
    );

    function initialPageParams(
        searchParams: { [key: string]: string | string[] | undefined }
    ) {
        if (!searchParams['offset']) {
            searchParams['offset'] = '0';
        }
        if (!searchParams['limit']) {
            searchParams['limit'] = '10';
        }
        redirect(`/position/${buildSearchParamString(searchParams)}`);
    }
}
